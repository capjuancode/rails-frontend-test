class ReasonsController < ApplicationController
  before_action :set_storefront, only: %i[ form_reason add_form_reason]
  before_action :set_reason, only: %i[form_reason]

  def form_reason
    respond_to do |format|
      format.turbo_stream { nested_form_reason_render(@reason) }
    end
  end

  def add_form_reason
    @new_reason = @storefront.reasons.build

    respond_to do |format|
      format.turbo_stream { nested_form_reason_render(@new_reason) }
    end
  end

  private

  def nested_form_reason_render(reason)
    helpers.fields model: @storefront do |form|
      render turbo_stream: turbo_stream.append(
        'storefront_reasons',
        partial: 'form',
        locals: { form: form, reason: reason }
      )
    end
  end

  def set_reason
    @reason = Reason.find(params[:reason_id])
  end

  def set_storefront
    @storefront = Storefront.find(params[:storefront_id])
  end
end
