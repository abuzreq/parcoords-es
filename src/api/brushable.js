import { brushSelection, brushY } from 'd3-brush';
import { event, select } from 'd3-selection';

const brushable = (config, pc, flags) =>
  function() {
    if (!pc.g()) {
      pc.createAxes();
    }

    const g = pc.g();

    // Add and store a brush for each axis.
    g.append('svg:g')
      .attr('class', 'brush')
      .each(function(d) {
        if (config.dimensions[d] !== undefined) {
          config.dimensions[d]['brush'] = brushY(select(this)).extent([
            [-15, 0],
            [15, config.dimensions[d].yscale.range()[0]],
          ]);
          select(this).call(
            config.dimensions[d]['brush']
              .on('start', function() {
                pc.brushReset();
              })
              .on('brush', function() {
                pc.brush();
              })
              .on('end', function() {
                pc.brush();
              })
          );
          select(this).on('dblclick', function() {
            pc.brushReset(d);
          });
        }
      });

    flags.brushable = true;
    return this;
  };

export default brushable;
