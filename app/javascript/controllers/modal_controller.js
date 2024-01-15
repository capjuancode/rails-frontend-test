import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = [
    'modal',
    'modalContent',
    'nestedForm'
  ]

  nestedFormTargetConnected(element) {
    const modalId = element.id;
    this.showModal(modalId)
  }

  /**
   * Shows the modal and the content associated with the clicked element.
   *
   * @param {Event} e - The click event.
   */
  clickShow(e) {
    e.preventDefault();
    const { modalId } = e.currentTarget.dataset;
    this.showModal(modalId);
  }

  showModal(modalId) {
    this.modalTarget.hidden = false;
    this.modalContentTarget.querySelector(`#${modalId}`).hidden = false;
  }

  /**
   * Hides the modal and all its content.
  *
  * @param {Event} e - The click event.
  */
 hide(e) {
   e.preventDefault();
    this.modalTarget.hidden = true;
    this.modalContentTarget.querySelectorAll('.nested-form-wrapper').forEach(child => {
      child.hidden = true;
    });
  }
}
