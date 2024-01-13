const output: string = 'ts loaded'
  , domEl: HTMLElement | null = document.getElementById('tsoutput')

domEl && (domEl.innerHTML = output)
