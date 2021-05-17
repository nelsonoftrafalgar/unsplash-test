describe('Single photo', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080/spooky')
    cy.get('[data-cy=single-collection-photo-overlay]').first().click()
  })

  it('clicking a photo opens a photo modal', () => {
    cy.get('[data-cy=single-photo-modal]').should('be.visible')
  })

  it('photo modal should contain a photo', () => {
    cy.get('[data-cy=modal-photo]').should('be.visible').invoke('attr', 'src').should('contain', 'unsplash')
  })

  it('photo modal should contain photo decription items', () => {
    cy.get('[data-cy=photo-description]')
      .children()
      .each(($el, $i) => {
        const type = ['Likes', 'Author', 'Views', 'Downloads', 'Added']
        cy.wrap($el).children().should('contain', type[$i])
      })
  })

  it('clicking X closes the modal', () => {
    cy.get('[data-cy=single-photo-modal-close]').click()
    cy.get('[data-cy=single-photo-modal]').should('not.be.visible')
  })
})
