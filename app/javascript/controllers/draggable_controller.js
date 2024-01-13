import { Controller } from "@hotwired/stimulus"
import { Sortable, Plugins } from '@shopify/draggable'

export default class extends Controller {

  /**
   * Initializes the Sortable object when the controller is connected.
   */
  connect() {
    const sortable = new Sortable(this.element, {
      draggable: '.draggable',
      delay: 150,
      mirror: {
        xAxis: false,
        constrainDimensions: true
      },
      swapAnimation: {
        duration: 200,
        easingFunction: 'ease'
      },
      plugins: [Plugins.SwapAnimation],
    });

    sortable.on('drag:stopped', this.updatePositionList);
  }

  /**
   * Updates the position of each item in the list after a drag event.
   *
   * @param {Object} e - The event object from the 'drag:stopped' event.
   * @property {HTMLElement} e.sourceContainer - The container element where the drag event started.
   */
  updatePositionList(e) {
    const { sourceContainer } = e;
    Array.from(sourceContainer.children).forEach((el, index) => {
      const [orderField] = el.getElementsByClassName('edit-action');
      const { modalId } = orderField.dataset;
      document.querySelector(`.nested-form-wrapper#${modalId} input.ordering-number`).value = index + 1;
    });
  }
}
