type QuantityStepperProps = {
  quantity: number
  max?: number
  decreaseLabel: string
  increaseLabel: string
  onDecrease: () => void
  onIncrease: () => void
}

export default function QuantityStepper({
  quantity,
  max = 10,
  decreaseLabel,
  increaseLabel,
  onDecrease,
  onIncrease,
}: QuantityStepperProps) {
  return (
    <div className="inline-flex items-center rounded-full border border-line">
      <button
        type="button"
        aria-label={decreaseLabel}
        onClick={onDecrease}
        disabled={quantity <= 1}
        className="flex h-8 w-8 items-center justify-center rounded-full text-base leading-none text-ink transition-colors hover:bg-sand disabled:cursor-not-allowed disabled:opacity-30"
      >
        −
      </button>
      <span aria-live="polite" className="min-w-6 text-center text-sm tabular-nums">
        {quantity}
      </span>
      <button
        type="button"
        aria-label={increaseLabel}
        onClick={onIncrease}
        disabled={quantity >= max}
        className="flex h-8 w-8 items-center justify-center rounded-full text-base leading-none text-ink transition-colors hover:bg-sand disabled:cursor-not-allowed disabled:opacity-30"
      >
        +
      </button>
    </div>
  )
}
