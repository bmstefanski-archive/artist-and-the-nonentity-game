import { Event } from './event.marker'

export type Subscription = { id: number; notifyCallback: NotifyCallback }
export type NotifyCallback = (event: Event) => void
