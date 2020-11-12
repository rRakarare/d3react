import React, {useRef, useEffect, useState} from 'react';
import {select, axisBottom, scaleLinear, axisRight, scaleBand} from 'd3';



const App = () => {

    const [data, setData] = useState([60,25,30,45,60,20,10,80,65]);
    const svgRef = useRef();

    useEffect(()=> {

        const svg = select(svgRef.current);

        const yScale = scaleLinear()
        .domain([0, 90])
        .range([150,0])

        const colorScale = scaleLinear()
        .domain([75,90, 150])
        .range(["grey","orange","red"])
        .clamp(true)


        const xScale = scaleBand()
            .domain(data.map((v,i)=>i))
            .range([0,300])
            .padding(0.2)

        const xAxis = axisBottom(xScale);
        svg.select('.x-axis').call(xAxis)
            .attr('transform', 'translate(0,150)')

        const yAxis = axisRight(yScale);
        svg.select('.y-axis').call(yAxis)
            .attr('transform', 'translate(300,0)')

        svg.selectAll('.bar')
            .data(data)
            .join('rect')
                .attr('class', 'bar')                
                .attr('transform', 'scale(1,-1)')                
                .attr('width',  xScale.bandwidth())
                .attr('x', (d,i)=> xScale(i))
                .attr('y', (d,i)=> -150)
                .on('mouseenter', (event,d) => {
                    const e = svg.selectAll('.bar').nodes();
                    const i = e.indexOf(event.currentTarget);
                    console.log(i);
                    svg
                        .selectAll('.tooltip')
                        .data([d])
                        .join("text")
                        .attr('class', 'tooltip')
                        .text(d)
                        .attr('x', xScale(i) + xScale.bandwidth()/2)
                        
                        .attr('text-anchor', 'middle')
                        .transition()
                            .attr('y', yScale(d) - 8)
                            .attr('opacity', 1)
                })
                .on('mouseleave', () => svg.selectAll('.tooltip').remove())
                .transition()
                .attr('fill', colorScale)
                .attr('height',  d=>150 - yScale(d))





    },[data])
    return (
        <div className="container">
            <div className="row">
                <div style={{marginTop: "50px"}} className="col s12 center-align">
                <svg ref={svgRef}>
                    <g className="x-axis"></g>
                    <g className="y-axis"></g>
                </svg>
                </div>
                <div style={{marginTop: "50px"}} className="col s12 center-align">
                    <button className="btn" onClick={()=> setData(data.map(p=>p+5))}>Update Data</button>
                    <button className="btn" onClick={()=> setData(data.filter(p=>p<35))}>Filter Data</button>
                    <button className="btn" onClick={()=> setData([...data, Math.round(Math.random() * 100)])}>Add Data</button>
                </div>
            
            </div>
        </div>
    );
}

export default App