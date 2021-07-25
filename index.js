// select svg container first
const svg = d3
  .select('.canvas')
  .append('svg')
  .attr('width', 600)
  .attr('height', 600);

// create margins and dimensions
const margin = { top: 20, right: 20, bottom: 100, left: 100 };
const graphWidth = 600 - margin.left - margin.right;
const graphHeight = 600 - margin.top - margin.bottom;

const graph = svg
  .append('g')
  .attr('width', graphWidth)
  .attr('height', graphHeight)
  .attr('transform', `translate(${margin.left}, ${margin.top})`);

d3.json('menu.json').then((data) => {
  const min = d3.min(data, (d) => d.orders);
  const max = d3.max(data, (d) => d.orders);
  const extent = d3.extent(data, (d) => d.orders);

  const y = d3.scaleLinear().domain([0, max]).range([0, 500]);

  // const min = d3.min(data.map(item => item.orders))
  // const max = d3.max(data.map(item => item.orders))
  // const extent = d3.extent(data.map(item => item.orders))

  console.log(min);
  console.log(max);
  console.log(extent);

  const x = d3
    .scaleBand()
    .domain(data.map((item) => item.name))
    .range([0, 500])
    .paddingInner(0.05)
    .paddingOuter(0.05);

  // join the data to rects
  const rects = graph.selectAll('rect').data(data);

  rects
    .attr('width', x.bandwidth)
    .attr('height', (d) => y(d.orders))
    .attr('fill', 'orange')
    .attr('x', (d) => x(d.name));

  // append the enter selection to the DOM
  rects
    .enter()
    .append('rect')
    .attr('width', x.bandwidth)
    .attr('height', (d) => y(d.orders))
    .attr('fill', 'orange')
    .attr('x', (d) => x(d.name));
});
