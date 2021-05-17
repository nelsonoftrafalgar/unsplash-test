describe('Collection List', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080/')
  })

  it('renders collection list with 6 columns', () => {
    cy.get('[data-cy=collection-preview-wrapper]').should('have.length', 6)
  })

  it('every column should have a title with text', () => {
    cy.get('[data-cy=collection-preview-wrapper]').each(($el) => {
      cy.get($el)
        .find('[data-cy=collection-preview-title]')
        .contains(/^[a-zA-Z ]*$/)
    })
  })

  it('every column should have 10 photos', () => {
    cy.get('[data-cy=collection-preview-wrapper]').each(($el) => {
      cy.get($el).find('[data-cy=collection-preview-photo]').should('have.length', 10)
    })
  })
})
