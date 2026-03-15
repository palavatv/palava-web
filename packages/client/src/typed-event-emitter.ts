/**
 * A strongly-typed EventEmitter.
 *
 * Usage:
 *   interface MyEvents {
 *     hello: [name: string]
 *     count: [n: number, label: string]
 *     done:  []
 *   }
 *   class Foo extends TypedEventEmitter<MyEvents> {}
 */

// Internal listener type — type safety is enforced by the public on/off/emit signatures
type Listener = (...args: unknown[]) => void

export class TypedEventEmitter<Events extends { [K in keyof Events]: unknown[] }> {
  // Use string keys internally so subclasses with wider event maps remain assignable
  private _listeners = new Map<string, Set<Listener>>()

  on<K extends keyof Events>(event: K, listener: (...args: Events[K]) => void): this {
    const key = event as string & K
    let set = this._listeners.get(key)
    if (!set) {
      set = new Set()
      this._listeners.set(key, set)
    }
    // Safe: listeners are only invoked through the typed emit() method
    set.add(listener as Listener)
    return this
  }

  off<K extends keyof Events>(event: K, listener: (...args: Events[K]) => void): this {
    this._listeners.get(event as string & K)?.delete(listener as Listener)
    return this
  }

  emit<K extends keyof Events>(event: K, ...args: Events[K]): this {
    const set = this._listeners.get(event as string & K)
    if (set) {
      for (const fn of set) {
        fn(...(args as unknown[]))
      }
    }
    return this
  }

  removeAllListeners(event?: keyof Events): this {
    if (event !== undefined) {
      this._listeners.delete(event as string & keyof Events)
    } else {
      this._listeners.clear()
    }
    return this
  }
}
