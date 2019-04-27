import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import * as D3 from 'd3';
import { Arc, ScaleOrdinal } from 'd3';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss'],
})
export class PieChartComponent implements AfterViewInit {
  @ViewChild('containerPieChart') element: ElementRef;
  @Input() width: any;
  @Input() height: any;
  @Input() pieData: any[];

  private host: D3.Selection<any, any, any, any>;
  private svg: D3.Selection<any, any, any, any>;
  private radius: number;
  private donutWidth: number;
  private legendRectSize: number;
  private legendSpacing: number;
  private color: ScaleOrdinal<string, string>;
  htmlElement: HTMLElement;

  constructor() {}

  ngAfterViewInit() {
    this.htmlElement = this.element.nativeElement;
    this.host = D3.select(this.htmlElement);
    this.buildPie();
  }

  private buildPie(): void {
    this.radius = Math.min(this.width, this.height) / 2;
    this.donutWidth = 60;
    this.legendRectSize = 18;
    this.legendSpacing = 4;
    this.host.html('');
    this.color = D3.scaleOrdinal(D3.schemeCategory10);

    this.svg = this.host
      .append('svg')
      .attr('width', this.width)
      .attr('height', this.height)
      .append('g')
      .attr('transform', `translate(${this.width / 2},${this.height / 2})`);

    let arc: Arc<any, any> = D3.arc()
      .innerRadius(this.radius - this.donutWidth)
      .outerRadius(this.radius);

    let pie = D3.pie()
      .value((d: any) => d.count)
      .sort(null);

    this.svg
      .selectAll('path')
      .data(pie(this.pieData))
      .enter()
      .append('path')
      .attr('d', arc)
      .attr('fill', (d: any) => this.color(d.data.label));

    let legend = this.svg
      .selectAll('.legend')
      .data(this.color.domain())
      .enter()
      .append('g')
      .attr('class', 'legend')
      .attr('transform', (d, i) => {
        let height = this.legendRectSize + this.legendSpacing;
        let offset = (height * this.color.domain().length) / 2;
        let horz = -2 * this.legendRectSize;
        let vert = i * height - offset;
        return 'translate(' + horz + ',' + vert + ')';
      });

    legend
      .append('rect')
      .attr('width', this.legendRectSize)
      .attr('height', this.legendRectSize)
      .style('fill', this.color)
      .style('stroke', this.color);

    legend
      .append('text')
      .attr('class', 'mat-caption')
      .attr('x', this.legendRectSize + this.legendSpacing)
      .attr('y', this.legendRectSize - this.legendSpacing)
      .text((d: string) => d);
  }
}
