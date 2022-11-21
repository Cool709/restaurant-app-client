import { generateUsername } from "../../src/utils/generate-username";

describe("Sign Up", () => {
  it("visit signup page", () => {
    cy.visit("http://localhost:3000/signup");
  });

  describe("Select role check", () => {
    it("Select user role - Owner", () => {
      cy.wait(2000);
      cy.contains("As a Owner").click();
    });

    it("Select user role - User", () => {
      cy.wait(2000);
      cy.contains("As a User").click();
    });
  });

  describe("Sign up form validation check", () => {
    it("Click sign up with out any input: will display warning", () => {
      cy.wait(2000);
      cy.get("button").contains("Sign Up").click();
    });

    it("Click sign up button with only name: will shows a warning", () => {
      cy.wait(5000);
      cy.get("input[placeholder='Name *']").clear().type("Test User");
      cy.get("button").contains("Sign Up").click();
    });

    it("Click sign up button with name and email: will shows a warning also", () => {
      cy.wait(5000);
      cy.get("input[placeholder='Name *']").clear().type("Test User");
      cy.get("input[placeholder='Email *']").clear().type("testuser@gmail.com");
      cy.get("button").contains("Sign Up").click();
    });

    it("Click sign up button with already registered user: will show a error", () => {
      cy.wait(5000);
      cy.get("input[placeholder='Name *']").clear().type("Test User");
      cy.get("input[placeholder='Email *']").clear().type("cool709@gmail.com");
      cy.get("input[placeholder='Password *']").clear().type("123456");
      cy.get("button").contains("Sign Up").click();
    });
  });

  describe("Sign up function check", () => {
    it("Sign up a random generated user", () => {
      const username = generateUsername(8);
      cy.wait(7000);
      cy.get("input[placeholder='Name *']").clear().type(username);
      cy.get("input[placeholder='Email *']")
        .clear()
        .type(`${username}@gmail.com`);
      cy.get("input[placeholder='Password *']").clear().type("123456");
      cy.get("button").contains("Sign Up").click();
      cy.wait(5000);
    });
  });
});
