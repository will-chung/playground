/**
 * Class representing a handle of a slice.
 */
class Handle {
  currSlice;
  adjSlice;

  /**
   * Create a handle. 
   * @param {*} currSlice - The slice handle is attached to.
   * @param {*} adjSlice  - The slice adjacent to the handle. 
   */
  constructor(currSlice, adjSlice) {
    this.currSlice = currSlice;
    this.adjSlice = adjSlice;
  }

  /**
   * Update slices based on handle position. 
   * @param {*} event - The triggered event.
   */
  update(event) {
    const angle = parseInt(event.target.value);
    const delta = this.currSlice.startAngle - angle;
    const newSize = this.currSlice.size + delta;
    const adjSize = this.adjSlice.size - delta;

    // out of bounds
    if (newSize < 0 || adjSize < 0) {
      event.target.value = this.currSlice.startAngle;
      return;
    } 

    this.currSlice.startAngle = angle;
    this.currSlice.size = newSize;
    this.adjSlice.endAngle = angle;
    this.adjSlice.size = adjSize;

    this.currSlice.updateRatio();
    this.adjSlice.updateRatio();

    this.currSlice.draw();
    this.adjSlice.draw();
  }
}

export { Handle };