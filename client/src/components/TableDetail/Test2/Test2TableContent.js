
const columnT = [
  { id: 'name', 
    label: 'NameTest', 
    minWidth: 170,
    align:'center' 
  },
  { id: 'code', 
    label: 'ISO\u00a0Code', 
    minWidth: 100,
    align:'center' 
  },
  {
    id: 'population',
    label: 'Population',
    minWidth: 170,
    align: 'center',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'size',
    label: 'Size\u00a0(km\u00b2)',
    minWidth: 170,
    align: 'center',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'density',
    label: 'Density(/km^2)',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toFixed(2),
  },
]


export {columnT}