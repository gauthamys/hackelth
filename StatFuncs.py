from logging import critical
from os import stat
import pandas as pd
from flask import jsonify
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
  counts = counts.sort_values('dummy_sysid',ascending=True)
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

def get_red_devices():
  cr=status_info[status_info['Label']=='Red'].drop(['drop'],axis='columns')
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


