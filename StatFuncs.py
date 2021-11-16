from logging import critical
from os import stat
import pandas as pd
from flask import jsonify
from sklearn.neighbors import NearestNeighbors
import numpy as np
from pycaret.regression import *

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
  label = status_info.loc[status_info['dummy_sysid']==sysid].drop(['dummy_part_number'],axis='columns')
  return toSeries(label)

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
  first_sr = (sr_sys_counts.loc[sr_sys_counts['dummy_sysid']==sysid]).sort_values('sr_open_date').reset_index()['sr_open_date'][0]
  return first_sr

def get_sys_install_date(sysid):
  install_date = ib.loc[ib['dummy_sysid']==sysid]['installdate'].unique()[0]
  return pd.to_datetime(install_date)

# Get similar systems to queried system
def find_nearest_system(sysid):
  all_data = pd.read_csv("./public/data/all_data_no_label.csv",index_col=False)
  #all_data.drop(columns=["Label"])
  ad2=all_data.dropna()
  idx = ad2.loc[ad2['dummy_sysid']==sysid]
  query_vector = idx.to_numpy()
  query_vector = np.delete(query_vector, [1])
  ad2.drop(columns=["dummy_sysid"],inplace=True)
  vector = ad2.to_numpy()
  neigh = NearestNeighbors(n_neighbors=3)
  neigh.fit(ad2)
  neighbors = neigh.kneighbors([query_vector], return_distance = False)
  return list(all_data.iloc[neighbors[0][1:]]['dummy_sysid'])

def check_in_service(sysid):
  sr_sort = sr.sort_values(by=["sr_open_date"])
  sr_sort.drop_duplicates(inplace=True)
  sys_row=sr_sort[sr_sort["dummy_sysid"]==sysid].iloc[-1]
  sr_diff = (pd.Timestamp.now().normalize()-sys_row['sr_close_date'])/ np.timedelta64(1, 'D')
  if sr_diff>0:
    return "System currently in service"
  else:
    return "System currently not in service"

def get_device_stats(sysid):
  d= {}
  d['bw_sr'] = avgTimeBetweenServices(sysid)
  d['down'] = avgDownTime(sysid)
  d['sr_count'] = avgSRCount(sysid)
  d['parts_replaced'] =  get_num_replaced(sysid)
  d['install_date'] = get_sys_install_date(sysid)
  d['first_sr'] = get_sys_sr(sysid)
  d['neareast_neigh'] = [find_nearest_system(sysid)]
  return toSeries(pd.DataFrame(d, index=[0]))

#print(get_device_stats('sys1018'))
print(find_nearest_system('sys1018'))

def get_exam_counts(sysid):
  sys_ec = ec[ec['dummy_sysid']==sysid]
  return sys_ec.shape[0]

def get_sr_counts(sysid):
  sys_sr = sr[sr['dummy_sysid']==sysid]
  return sys_sr.shape[0]

def get_age(sysid):
  sys = ib[ib["dummy_sysid"]==sysid]
  age=(pd.Timestamp.now().normalize()-sys['installdate'])/ np.timedelta64(1, 'Y')
  try:
    return list(age)[0]
  except IndexError:
    return 0 

def get_last_service(sysid):
  sys = sr[sr["dummy_sysid"]==sysid]
  last_service=(pd.Timestamp.now().normalize()-sys['sr_close_date'])/ np.timedelta64(1, 'Y')
  try:
    return sorted(list(last_service),reverse=True)[0]
  except IndexError:
    return 0

def get_sys_parts(sysid):
  lgbm=load_model('PartModel')
  sys_parts = sr[sr['dummy_sysid']==sysid]
  sys_parts.dropna(subset=["dummy_part_number"],inplace=True)
  sr_count = get_sr_counts(sysid)
  ec_count=get_exam_counts(sysid)
  age = get_age(sysid)
  last_sr= get_last_service(sysid)
  sys_parts["sr_freq"]=sys_parts["dummy_sysid"].apply(get_sr_counts)
  sys_parts["ageagainstinstallation"]=[age]*sys_parts.shape[0]
  sr_freq = list(sys_parts["sr_freq"])[0]
  sys_parts["ec_freq"]=sys_parts["dummy_sysid"].apply(get_exam_counts)
  ec_freq = list(sys_parts["ec_freq"])[0]
  parts = set(sys_parts["dummy_part_number"])
  counts=sr["dummy_sysid"].groupby(sr.dummy_part_number).count().to_frame().reset_index()
  top_replaced=set(counts.head(5))
  to_predict = parts.union(top_replaced)
  new_row={}
  for part in to_predict:
    if part in parts:
      sys_parts["avg_time"]=sys_parts["dummy_part_number"].apply(avgTimeBetweenServices)
      sys_parts["Last_service"]=(pd.Timestamp.now().normalize()-sys_parts['sr_close_date'])/ np.timedelta64(1, 'Y')
    else:
      new_row={'dummy_sysid':sysid,'dummy_part_number':part,' ageagainstinstallation':age,"avg_time": 0,"sr_freq":sr_freq,"ec_freq":ec_freq,"Last_service":last_sr}
      sys_parts.append(new_row,ignore_index=True)
  sys_parts = sys_parts.loc[:,["dummy_sysid","dummy_part_number","ageagainstinstallation","avg_time","sr_freq","ec_freq","Last_service"]]
  predictions = predict_model(lgbm, data = sys_parts)
  predictions["Label"] = pd.qcut(predictions["Label"],q=3,labels=["Red","Yellow","Green"])
  red_yellow = predictions[(predictions["Label"]=='Red')|(predictions["Label"]=='Yellow')]
  return toSeries(red_yellow)