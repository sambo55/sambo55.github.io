# Hello world

This is my first post.

How to create a new df column based on values shared between df column and list.

for i in range(len(list)):
  df_indices = df[df[col]==i].index.values
  df.loc[df_indices,new_col] = list[i]
