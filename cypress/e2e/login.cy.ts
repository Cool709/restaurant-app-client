describe("Login", () => {
  it("visit login page", () => {
    cy.visit("http://localhost:3000/login");
  });

  describe("Sign in form validation check", () => {
    it("Click sign in without any input: will show warning", () => {
      cy.wait(5000);
      cy.get("button").contains("Sign In").click();
    });

    it("Click sign in with only email input: will show warning", () => {
      cy.wait(5000);
      cy.get('input[placeholder="Email"]')
        .clear()
        .type("not-registered@gmail.com");
      cy.get("button").contains("Sign In").click();
    });

    it("Login with invalid user", () => {
      cy.wait(5000);
      cy.get('input[placeholder="Email"]')
        .clear()
        .type("not-registered@gmail.com");
      cy.get('input[placeholder="Password"]').clear().type("123456");
      cy.get("button").contains("Sign In").click();
    });
  });

  describe("Sign in function check", () => {
    it("Login with valid user", () => {
      cy.wait(7000);
      cy.get('input[placeholder="Email"]').clear().type("cool709@gmail.com");
      cy.get('input[placeholder="Password"]').clear().type("123456");
      cy.get("button").contains("Sign In").click();
    });
  });

  describe("Sign out check", () => {
    it("Sign out", () => {
      cy.wait(5000);
      cy.contains("Sign out").click();
    });
  });
});
