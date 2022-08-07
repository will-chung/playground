import { ctx, RADIUS, slices, FULL } from "./script.js";
import { toRad } from "./util.js";

/**
 * Class representing a sector of the roulette wheel.
 */
class Slice {
  startAngle = 0;
  endAngle = 0;
  size = 0;
  ratio = 0;
  r = RADIUS;
  color = 'white';

  /**
   * Create a slice. 
   * @param {*} startAngle - The starting angle.
   * @param {*} endAngle   - The ending angle. 
   * @param {*} color      - The slice color.
   */
  constructor(startAngle, endAngle, color) {
    this.startAngle = startAngle;
    this.endAngle = endAngle;
    this.size = this.endAngle - this.startAngle;
    this.ratio = 1;
    this.color = color;
  }

  /**
   * Update slice size.
   */
  updateSize() {
    this.size = this.endAngle - this.startAngle;
  }

  /**
   * Update slice ratio, which represents its size relative to "base",
   * where "base" is 360 degs / total number of slices.  
   */ 
  updateRatio() {
    const baseSize = FULL / slices.length;
    const newRatio = this.size / baseSize;

    this.ratio = newRatio;
  }

  /**
   *  Draw the slice with specified color. 
   * @param {*} color - The slice color.
   */
  draw(color) {
    // rotate canvas
    ctx.save();
    ctx.rotate(toRad(this.startAngle));

    if (!color) ctx.fillStyle = this.color;
    else ctx.fillStyle = color;

    // fill slice
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(this.r, 0);
    ctx.arc(0, 0, this.r, 0, toRad(this.size));
    ctx.fill();
    ctx.closePath();

    // draw radial 
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(this.r, 0);
    ctx.stroke();
    ctx.closePath();

    // restore canvas
    ctx.restore();
  }

  /**
   * Clear the slice from canvas.
   */
  clear() {
    this.draw('white');
  }
}

export { Slice };