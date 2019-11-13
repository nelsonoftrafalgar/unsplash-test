
describe('Single collection', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080/162326')
  })

  it('sorting by newest changes photo order', () => {
    cy.get('[data-cy=single-collection-photo]')
      .eq(0)
      .invoke('attr', 'src')
      .then(($srcAtr) => {

        cy.get('.css-1w37yv3-container')
          .click()
        cy.get('#react-select-2-option-0')
          .click()

        expect(
          cy.get('[data-cy=single-collection-photo]')
            .eq(0)
            .invoke('attr', 'src')
            .should('not.eq', $srcAtr)
        )
      })
  })

  it('sorting by most-popular changes photo order', () => {
    cy.get('[data-cy=single-collection-photo]')
      .eq(0)
      .invoke('attr', 'src')
      .then(($srcAtr) => {

        cy.get('.css-1w37yv3-container')
          .click()
        cy.get('#react-select-2-option-1')
          .click()

        expect(
          cy.get('[data-cy=single-collection-photo]')
            .eq(0)
            .invoke('attr', 'src')
            .should('not.eq', $srcAtr)
        )
      })
  })

})