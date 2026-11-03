# Shared Scenarios (same flows in every tool)

Site: https://www.saucedemo.com  |  Password for all users: secret_sauce
Users: standard_user, locked_out_user, problem_user, performance_glitch_user

| # | Scenario | Key assertions |
|---|---|---|
| 1 | Login success | URL has inventory.html, title "Products", 6 items |
| 2 | Login failure | Wrong password error; locked_out_user error |
| 3 | Add to cart | Cart badge shows 1, item appears in cart |
| 4 | Checkout | Info form, overview, "Thank you for your order" |
| 5 | Form validation | Missing first name / last name / zip shows error |

Selector hints (verify in DevTools on first run):
- Login: [data-test="username"], [data-test="password"], [data-test="login-button"], [data-test="error"]
- Inventory: [data-test="inventory-item"], [data-test="add-to-cart-sauce-labs-backpack"]
- Cart: [data-test="shopping-cart-link"], [data-test="shopping-cart-badge"], [data-test="checkout"]
- Checkout: [data-test="firstName"], [data-test="lastName"], [data-test="postalCode"], [data-test="continue"], [data-test="finish"], [data-test="complete-header"]
