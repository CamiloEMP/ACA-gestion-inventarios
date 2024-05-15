import { expect, test } from '@playwright/test'

test.beforeEach('Login must works fine', async ({ page }) => {
  await page.goto('http://localhost:5173/')
  await page.getByLabel('Correo electrónico*').click()
  await page.getByLabel('Correo electrónico*').click()
  await page.getByLabel('Correo electrónico*').fill('camilo@speakableapp.com')
  await page.getByLabel('Contraseña*').click()
  await page.getByLabel('Contraseña*').fill('camilo123')
  await page.getByRole('button', { name: 'Iniciar sesión' }).click()

  await page.waitForURL('http://localhost:5173/dashboard/products')

  const text = page.getByRole('heading', { name: 'Productos' })

  await expect(text).toBeVisible()
})

test('Check if the product was created correctly', async ({ page }) => {
  await page.goto('http://localhost:5173/dashboard/products', { waitUntil: 'load' })
  await page.getByRole('button', { name: 'Crear producto' }).click()
  await page.getByLabel('Nombre del producto*').fill('producto')
  await page.getByLabel('Nombre del producto*').press('Tab')
  await page.getByLabel('Precio del producto *').fill('20000')
  await page.getByLabel('Precio del producto *').press('Tab')
  await page.getByLabel('Stock *').fill('40')
  await page.getByLabel('Stock *').press('Tab')
  await page.getByLabel('Descuento').fill('20')
  await page.getByLabel('Descuento').press('Tab')
  await page.getByLabel('Proveedor *').fill('NINGUNO')
  await page.getByLabel('Imagen del producto *').setInputFiles('public/vite.svg')
  await page.getByRole('button', { name: 'Crear producto' }).click()

  const text = page.getByText('Producto creado correctamente')

  await expect(text).toBeVisible()
})

// test('Check if product was sold correctly', async ({ page }) => {
//   await page.goto('http://localhost:5173/dashboard/sales-history', { waitUntil: 'load' })

//   const tableProductsSold = page.getByRole('table')

//   await expect(tableProductsSold).toBeVisible() // Check if table is visible
//   // Check if table has rows if not wait for the table to load

//   await page.waitForTimeout(5000)

//   const countProductsSold = await page.locator('tbody').count()

//   console.log({ countProductsSold })

//   expect(countProductsSold).toBeGreaterThan(0) // Check if table has rows

//   await page.getByRole('button', { name: 'Registrar venta' }).click()

//   const dialog = page.getByRole('dialog')

//   await expect(dialog).toBeVisible()

//   const dialogTable = dialog.locator('section section').nth(0)

//   await expect(dialogTable).toBeVisible()

//   const firstRow = dialogTable.locator('div').first()

//   expect(firstRow).not.toBe(null)

//   const checkbox = dialog.locator('input[type="checkbox"]').first()

//   await checkbox.check()

//   const input = firstRow.locator('input[type="number"]')

//   await input.fill('1')

//   const buttonDialog = dialog.locator('button', {
//     hasText: 'Registrar venta',
//   })

//   await buttonDialog.click()

//   const newCountProductsSold = await page.locator('tbody').count()

//   console.log({ newCountProductsSold, countProductsSold })
//   expect(newCountProductsSold).toBe(countProductsSold + 1)
// })
