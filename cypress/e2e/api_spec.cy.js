describe('API /crawl – conforme enunciado', () => {
  /* POST válido */
  it('deve retornar id com 8 caracteres para keyword válida', () => {
    cy.request('POST', '/crawl', { keyword: 'security' }).then((res) => {
      expect(res.status).to.eq(200)
      expect(res.body.id).to.eq('30vbllyb')         // conforme stub
      expect(res.body.id).to.match(/^[a-z0-9]{8}$/) // formatação
    })
  })

  /* POST inválido */
  it('deve retornar 400 quando keyword for menor que 4 caracteres', () => {
    cy.request({
      method: 'POST',
      url: '/crawl',
      body: { keyword: 'abc' },
      failOnStatusCode: false
    }).then((res) => {
      expect(res.status).to.eq(400)
      expect(res.body.error).to.contain('4 and 32')
    })
  })

  /* GET ativo */
  it('deve retornar status active com resultados parciais', () => {
    cy.request('/crawl/30vbllyb?partial=true').then((res) => {
      failOnStatusCode: false
      expect(res.status).to.eq(200)
      expect(res.body.status).to.eq('active')
      expect(res.body.urls).to.include('http://hiring.axreng.com/index2.html')
    })
  })

  /* GET concluído – alternando stub em runtime (opcional) */
 it('deve retornar status done e lista completa', () => {
  // 1. limpa todos os stubs carregados
  cy.request('POST', '/__admin/mappings/reset').then(() => {
    
    // 2. registra o stub "done"
    cy.request('POST', '/__admin/mappings', {
      request: { method: 'GET', url: '/crawl/30vbllyb' },
      response: {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
        jsonBody: {
          id: '30vbllyb',
          status: 'done',
          urls: [
            'http://hiring.axreng.com/index2.html',
            'http://hiring.axreng.com/htmlman1/chcon.1.html'
          ]
        }
      }
    }).then(() => {
      
      // 3. faz a chamada e valida
      cy.request('/crawl/30vbllyb').then((res) => {
        expect(res.status).to.eq(200)
        expect(res.body.status).to.eq('done')
        expect(res.body.urls).to.have.length(2)
      })
      
    })
    
  })
})
})