let funcionarios = [];
let bonusFaixas = {10:0, 5:0, 2:0, 0:0};

function calcularSalario(func, salarioMinimo){
  let percentualHora = 0;
  switch(func.categoria){
    case "F": 
      if(func.turno === "M") percentualHora = 0.10;
      else if(func.turno === "V") percentualHora = 0.15;
      else if(func.turno === "N") percentualHora = 0.20;
      break;
    case "G":
      if(func.turno === "M") percentualHora = 0.30;
      else if(func.turno === "V") percentualHora = 0.35;
      else if(func.turno === "N") percentualHora = 0.40;
      break;
  }
  let salarioInicial = salarioMinimo + salarioMinimo * percentualHora;
  let valorHora = salarioInicial / func.horas;

  let auxilio = 0;
  if(salarioInicial <= 800) auxilio = salarioInicial * 0.25;
  else if(salarioInicial <= 1200) auxilio = salarioInicial * 0.20;
  else auxilio = salarioInicial * 0.15;

  let bonus = 0;
  if(func.nota >= 9) { bonus = salarioInicial * 0.10; bonusFaixas[10]++; }
  else if(func.nota >= 7) { bonus = salarioInicial * 0.05; bonusFaixas[5]++; }
  else if(func.nota >= 5) { bonus = salarioInicial * 0.02; bonusFaixas[2]++; }
  else { bonusFaixas[0]++; }

  func.salarioFinal = salarioInicial + auxilio + bonus;
}

document.getElementById("funcionarioForm").addEventListener("submit", function(e){
  e.preventDefault();

  let salarioMinimo = parseFloat(document.getElementById("salarioMinimo").value);
  if(isNaN(salarioMinimo) || salarioMinimo <= 0){
    alert("Informe o salário mínimo corretamente!");
    return;
  }

  let codigo = document.getElementById("codigo").value;
  if(funcionarios.some(f => f.codigo === codigo)){
    alert("Código já existente!");
    return;
  }

  let func = {
    codigo: codigo,
    horas: parseFloat(document.getElementById("horas").value),
    categoria: document.getElementById("categoria").value,
    turno: document.getElementById("turno").value,
    nota: parseFloat(document.getElementById("nota").value)
  };

  if(func.nota < 0 || func.nota > 10){
    alert("Nota inválida! Deve estar entre 0 e 10.");
    return;
  }

  calcularSalario(func, salarioMinimo);
  funcionarios.push(func);

  alert("Funcionário cadastrado com sucesso!");
  gerarRelatorio();
  gerarTabelaFuncionarios();
});

function gerarRelatorio(){
  if(funcionarios.length === 0) return;

  let total = funcionarios.length;
  let soma = funcionarios.reduce((acc,f) => acc + f.salarioFinal, 0);
  let mediaGeral = soma / total;

  let funcionariosF = funcionarios.filter(f => f.categoria === "F");
  let funcionariosG = funcionarios.filter(f => f.categoria === "G");

  let mediaF = funcionariosF.length ? funcionariosF.reduce((acc,f) => acc + f.salarioFinal,0)/funcionariosF.length : 0;
  let mediaG = funcionariosG.length ? funcionariosG.reduce((acc,f) => acc + f.salarioFinal,0)/funcionariosG.length : 0;

  let maior = funcionarios.reduce((a,b) => a.salarioFinal > b.salarioFinal ? a : b);
  let menor = funcionarios.reduce((a,b) => a.salarioFinal < b.salarioFinal ? a : b);

  document.getElementById("resultado").innerHTML = `
    <p><strong>Total de funcionários:</strong> ${total}</p>
    <p><strong>Média salarial geral:</strong> R$ ${mediaGeral.toFixed(2)}</p>
    <p><strong>Média salarial Operacionais:</strong> R$ ${mediaF.toFixed(2)}</p>
    <p><strong>Média salarial Gerentes:</strong> R$ ${mediaG.toFixed(2)}</p>
    <p><strong>Maior salário:</strong> Código ${maior.codigo}, Categoria ${maior.categoria}, Turno ${maior.turno}, Valor R$ ${maior.salarioFinal.toFixed(2)}</p>
    <p><strong>Menor salário:</strong> Código ${menor.codigo}, Categoria ${menor.categoria}, Turno ${menor.turno}, Valor R$ ${menor.salarioFinal.toFixed(2)}</p>
    <p><strong>Funcionários com bônus 10%:</strong> ${bonusFaixas[10]}</p>
    <p><strong>Funcionários com bônus 5%:</strong> ${bonusFaixas[5]}</p>
    <p><strong>Funcionários com bônus 2%:</strong> ${bonusFaixas[2]}</p>
    <p><strong>Funcionários sem bônus:</strong> ${bonusFaixas[0]}</p>
  `;}

  function gerarTabelaFuncionarios(){
  if(funcionarios.length === 0) {
    document.getElementById("tabelaFuncionarios").innerHTML = "<p>Nenhum funcionário cadastrado.</p>";
    return;
  }

  let tabela = `<table border='1' cellpadding='5' cellspacing='0'>
    <thead>
      <tr>
        <th>Código</th>
        <th>Cargo</th>
        <th>Salário Total (R$)</th>
      </tr>
    </thead>
    <tbody>`;

  funcionarios.forEach(f => {
    let cargo = f.categoria === "F" ? "Funcionário Operacional" : "Gerente";
    tabela += `<tr>
      <td>${f.codigo}</td>
      <td>${cargo}</td>
      <td>${f.salarioFinal.toFixed(2)}</td>
    </tr>`;
  });

  tabela += `</tbody></table>`;

  document.getElementById("tabelaFuncionarios").innerHTML = tabela;
}

