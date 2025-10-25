const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '..', 'data', 'cuentas.json');

function leerCuentas() {
  const raw = fs.readFileSync(dataPath, 'utf8');
  return JSON.parse(raw);
}

function parseBalanceToNumber(balanceStr) {
  if (!balanceStr && balanceStr !== 0) return 0;
  const cleaned = String(balanceStr).replace(/[^\d.,-]/g, '');
  const onlyDigits = cleaned.replace(/,/g, '');
  const num = parseFloat(onlyDigits);
  return isNaN(num) ? 0 : num;
}

module.exports.getAll = (req, res) => {
  const cuentas = leerCuentas();
  res.json({ count: cuentas.length, data: cuentas });
};

module.exports.getById = (req, res) => {
  const id = req.params.id;
  const cuentas = leerCuentas();
  const account = cuentas.find(c => String(c._id) === String(id));

  if (account) {
    return res.json({ finded: true, account });
  } else {
    return res.json({ finded: false, account: null });
  }
};

module.exports.query = (req, res) => {
  const q = req.query.queryParam;
  const cuentas = leerCuentas();

  if (!q) return res.status(400).json({ error: "Se requiere queryParam" });

  const qLower = String(q).toLowerCase();
  const matches = cuentas.filter(c => {
    if (String(c._id).toLowerCase() === qLower) return true;
    if (c.client && c.client.toLowerCase().includes(qLower)) return true;
    if (c.gender && String(c.gender).toLowerCase() === qLower) return true;
    return false;
  });

  if (matches.length === 0) return res.json({ finded: false });
  if (matches.length === 1) return res.json({ finded: true, account: matches[0] });
  return res.json({ finded: true, data: matches });
};

module.exports.cuentasBalance = (req, res) => {
  const cuentas = leerCuentas();
  const activos = cuentas.filter(c => c.isActive === true);

  if (activos.length === 0)
    return res.json({ status: false, accountBalance: 0 });

  const suma = activos.reduce((acc, c) => acc + parseBalanceToNumber(c.balance), 0);
  const sumaRounded = Math.round((suma + Number.EPSILON) * 100) / 100;

  res.json({ status: true, accountBalance: sumaRounded });
};