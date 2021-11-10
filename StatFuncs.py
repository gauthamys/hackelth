from logging import critical
from os import stat
import pandas as pd
from flask import jsonify
from sklearn.neighbors import NearestNeighbors
import numpy as np

sr_sys_counts=pd.read_csv("./public/data/sr_sys_counts.csv")
ib = pd.read_csv("./public/data/Hackathon_IB_Data_1.csv")
sr = pd.read_csv("./public/data/Hackathon_SR_Data_1.csv")
ec = pd.read_csv("./public/data/Hackathon_exam_count_Data.csv")
status_info=pd.read_csv("./public/data/all_data.csv",index_col=False)
ib['installdate'] = pd.to_datetime(ib['installdate'],errors = 'coerce').dt.normalize()
ib['deinstalldate'] = pd.to_datetime(ib['deinstalldate'],errors = 'coerce').dt.normalize()
sr['sr_open_date'] = pd.to_datetime(sr['sr_open_date'],errors = 'coerce').dt.normalize()
sr['sr_close_date'] = pd.to_datetime(sr['sr_close_date'],errors = 'coerce').dt.normalize()


def to_json(data):
  result_data = []
  row_count = data.shape[0]
  column_count = data.shape[1]
  column_names = data.columns.tolist()
  final_row_data = []
  for index, rows in data.iterrows():
    final_row_data.append(rows.to_dict())
  json_result = {'rows': row_count, 'cols': column_count, 'columns': column_names, 'rowData': final_row_data}
  result_data.append(json_result)
  return jsonify(result_data)

def toSeries(df):
  #row_data=[list(df.columns)]
  col = list(df.columns)
  row_data = []
  for index, rows in df.iterrows():
    row_data.append(list(rows))
  json_res = {"rows" : len(row_data), "columns" : len(col), "row_data" : row_data, "col_data" : col }
  return json_res

def get_sr_costs():
  src=sr.groupby('dummy_sysid').sum('Cos').drop('hour',axis='columns')
  srh=sr.groupby('dummy_sysid').sum('hour').drop('Cos',axis='columns')
  return {'cost':src,'hours':srh}
  
def get_sys():
  ib.drop_duplicates(inplace=True)
  ib.drop(['ownershiptype','systemcoveragelevelwarrantyc','transferacceptancedate','shippeddate','last_covered_date'],axis='columns',inplace=True)
  return toSeries(ib)

def get_service_plot():
    # returns service counts for all the sys ids
    counts=sr["dummy_sysid"].groupby(sr.sr_open_date.dt.year).count().to_frame().reset_index()
    #return counts.to_dict()
    return toSeries(counts)

def get_service_month():
  counts=sr["dummy_sysid"].groupby(sr.sr_open_date.dt.month).count().to_frame().reset_index()
  return toSeries(counts)

def get_parts_counts():
  counts=sr["dummy_sysid"].groupby(sr.dummy_part_number).count().to_frame().reset_index()
  counts=counts[counts['dummy_sysid']>=10]
  #counts = counts.sort_values('dummy_sysid',ascending=True)
  return toSeries(counts)

def get_freq_sys():
  freqs=sr_sys_counts.loc[:,["dummy_sysid","count"]]
  freqs=freqs.sort_values('count',ascending=True).head(50)
  return toSeries(freqs)
  
def get_ec_stats():
  stats = ec.groupby(['aggr_month','aggr_year']).agg({'aggr_value':'sum'}).reset_index()
  stats = stats.sort_values(['aggr_year', 'aggr_month'], ascending=True)
  return toSeries(stats)
  
def get_total_ec():
  counts = ec.groupby(['dummy_sysid']).agg({'aggr_value':'sum'}).reset_index()
  counts = counts.sort_values('aggr_value', ascending=False)
  return toSeries(counts)
  
def ec_max_month():
  ec1 = ec.dropna(subset=["dummy_sysid"])
  stats=ec1.loc[ec1.groupby(['aggr_month','aggr_year'])['aggr_value'].idxmax()]
  return toSeries(stats[["dummy_sysid","aggr_value"]])

def get_labels():
  gc = status_info.groupby(['Label']).count()
  return gc['dummy_sysid'].to_dict()

def get_devices():
  cr=status_info
  return toSeries(cr)

def predict(sysid):
  #row=status_info.loc[:,['dummy_sysid','Label']]
  label = status_info.loc[status_info['dummy_sysid']==sysid].drop(['dummy_part_number'],axis='columns')
  return toSeries(label)
  #label_list =  list(label["Label"])
  #if len(label_list)>0:
  #return label_list[0]
  #else:
  #  return "System details not found"

# Part specific Functions :

def avgTimeBetweenServices(sysid):
  sr_dates = sr[sr['dummy_sysid']==sysid]
  sr_dates = sr_dates[['sr_open_date', 'sr_close_date']].reset_index()
  sum = 0
  for i in range(1, len(sr_dates)) :
    sum = sum + ((abs(sr_dates.loc[i, "sr_open_date"] - sr_dates.loc[i-1, "sr_close_date"])).days)
  return(sum/(len(sr_dates)-1))

def avgDownTime(sysid):
  n = sr[sr['dummy_sysid']==sysid][['sr_open_date', 'sr_close_date']]
  return((n['sr_close_date'] - n['sr_open_date']).mean().days)

def avgSRCount(sysid):
  yr = list(pd.DatetimeIndex(sr[sr['dummy_sysid']==sysid]['sr_open_date']).year)
  sum = 0
  for i in set(yr):
    sum = sum+yr.count(i)
  return(sum/(len(set(yr))))

def get_num_replaced(sysid):
  count_replaced = sr.loc[sr['dummy_sysid']==sysid]['dummy_part_number'].count()
  return count_replaced

def get_sys_sr(sysid):
  first_sr = (sr_sys_counts.loc[sr_sys_counts['dummy_sysid']==sysid]).sort_values('sr_open_date')['sr_open_date'][0]
  return pd.to_datetime(first_sr)

def get_sys_install_date(sysid):
  install_date = ib.loc[ib['dummy_sysid']==sysid]['installdate'].unique()[0]
  return pd.to_datetime(install_date)

# Get similar systems to queried system
def find_nearest_system(sysid):
  all_data = pd.read_csv("all_data.csv")
  ad2=all_data.dropna()
  idx = ad2.loc[ad2['dummy_sysid']==sysid]
  query_vector = idx.to_numpy()
  query_vector = np.delete(query_vector, [1,-1])
  ad2.drop(columns=["dummy_sysid","Label"],inplace=True)
  vector = ad2.to_numpy()
  neigh = NearestNeighbors(n_neighbors=3)
  neigh.fit(ad2)
  neighbors = neigh.kneighbors([query_vector], return_distance = False)
  return toSeries(all_data.iloc[neighbors[0][1:]])