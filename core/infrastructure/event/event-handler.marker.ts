export interface EventHandler {
  execute(): Promise<void>
}
