import pandas as pd
from flask import jsonify
sr_sys_counts=pd.read_csv("./data/sr_sys_counts.csv")
ib = pd.read_csv("./data/Hackathon_IB_Data_1.csv")
sr = pd.read_csv("./data/Hackathon_SR_Data_1.csv")
ec = pd.read_csv("./data/Hackathon_exam_count_Data.csv")
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

def get_service_plot():
    # returns service counts for all the sys ids
    counts=sr["dummy_sysid"].groupby(sr.sr_open_date.dt.year).count().to_frame().reset_index()
    return counts.to_dict()

def get_service_month():
  counts=sr["dummy_sysid"].groupby(sr.sr_open_date.dt.month).count().to_frame().reset_index()
  return counts.to_dict()

def get_parts_counts():
  counts=sr["dummy_sysid"].groupby(sr.dummy_part_number).count().to_frame().reset_index()
  return counts.to_dict()

def get_freq_sys():
  freqs=sr_sys_counts.loc[:,["dummy_sysid","count"]]
  freqs=freqs.sort_values('count',ascending=False).head(50)
  return freqs.to_dict()
  
def get_ec_stats():
  stats = ec.groupby(['aggr_month','aggr_year']).agg({'aggr_value':'sum'}).reset_index()
  return stats.to_dict()
  



