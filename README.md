# Exercício 2

## Sistema Avançado de Folha de Pagamento com Bônus de Desempenho e Relatório Mensal

Uma rede hoteleira deseja aprimorar ainda mais sua folha de pagamento mensal, incluindo agora bônus por desempenho baseado em avaliações internas. Crie um sistema robusto em JavaScript para calcular e gerenciar a folha salarial de vários funcionários, considerando bônus e diferentes cenários.

## Requisitos:
- O programa deve permitir cadastrar múltiplos funcionários até que o usuário decida parar.
- Para cada funcionário cadastrado, o usuário deve inserir as seguintes informações:
    - Código do funcionário (não pode ser repetido, o sistema deve validar isso).
    - Horas trabalhadas no mês.
    - **Categoria**: 
    [] Funcionário operacional (F)
    [] Gerente (G)
    - **Turno de trabalho**: 
    [] Matutino (M)
    [] Vespertino (V)
    [] Noturno (N)
    - Avaliação de desempenho mensal do funcionário (nota de 0 a 10, sendo obrigatória a validação).
    - Valor da Hora Trabalhada (em % do salário mínimo):
    **Funcionário operacional (F)**: 
    [] M: 10%
    [] V: 15%
    [] N: 20%
    **Gerente (G)**: 
    [] M: 30%
    [] V: 35%
    [] N: 40%
    - Auxílio-Alimentação (calculado sobre o salário inicial):
    o	Até R$ 800,00 → 25%
    o	De R$ 800,01 até R$ 1200,00 → 20%
    o	Acima de R$ 1200,00 → 15%
    - Cálculo do Bônus por desempenho:
    o	Nota 9 a 10 → bônus de 10% sobre o salário inicial
    o	Nota 7 a 8,99 → bônus de 5% sobre o salário inicial
    o	Nota 5 a 6,99 → bônus de 2% sobre o salário inicial
    o	Nota abaixo de 5 → sem bônus
 O usuário deve informar o valor atual do salário mínimo no início do programa.
 O salário final será calculado da seguinte forma:
 Salário Final = Salário Inicial + Auxílio-Alimentação + Bônus de desempenho

Ao finalizar o cadastro, o sistema deverá exibir um relatório detalhado contendo:
•	Quantidade total de funcionários cadastrados.
•	Média salarial geral dos funcionários cadastrados (salário final).
•	Média salarial por categoria (Funcionários e Gerentes).
•	Maior e menor salário final, exibindo código, categoria, turno e valor recebido.
•	Quantidade de funcionários que receberam cada faixa de bônus (10%, 5%, 2% e nenhum bônus).
