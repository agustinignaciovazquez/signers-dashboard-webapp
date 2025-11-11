export function Header() {
  return (
    <header className="border-b border-border bg-card">
      <div className="px-4 py-6 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-lg">₿</span>
          </div>
          <div>
            <h1 className="text-3xl font-bold">Balance Monitor</h1>
            <p className="text-sm text-muted-foreground">Track signer balances across blockchains</p>
          </div>
        </div>
      </div>
    </header>
  )
}
