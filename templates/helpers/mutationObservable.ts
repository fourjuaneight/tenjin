import { Observable } from 'rxjs'

/**
 * Observe the target node for mutations and emit the mutation records.
 * Uses MutationObserver API.
 */
export const observeOnMutation = (
  target: Node,
): Observable<MutationRecord[]> => {
  const config = {
    attributes: true,
    childList: false,
    characterData: false,
  }

  return new Observable((observer) => {
    const mutation = new MutationObserver((mutations, instance) => {
      observer.next(mutations)
    })

    mutation.observe(target, config)

    const unsubscribe = () => {
      mutation.disconnect()
    }

    return unsubscribe
  })
}
