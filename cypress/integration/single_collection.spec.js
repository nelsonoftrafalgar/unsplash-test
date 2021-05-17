describe('Single collection', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080/dark_portraits')
  })

  it('renders the collection title', () => {
    cy.get('[data-cy=single-collection-title]').contains('Dark Portraits')
  })

  it('renders collection sort select', () => {
    cy.get('[data-cy=single-collection-title]').siblings().should('have.length', 1)
  })

  it('intially renders 25 photos', () => {
    cy.get('[data-cy=single-collection-photo-wrapper]').should('have.length', 25)
  })

  it('after scroll it renders 50 photos', () => {
    cy.get('[data-cy=single-collection-photo-wrapper]').last().scrollIntoView().end()
    cy.wait(1000)
    cy.get('[data-cy=single-collection-photo-wrapper]').should('have.length', 50)
  })
})
