import * as fs from "fs";
import * as readline from "readline/promises";
import { stdin as input, stdout as output } from "process";

interface Agendamento {
  nome: string;
  servico: string;
  horario: string;
}

const rl = readline.createInterface({ input, output });

function mostrarMenu(): void {
  console.log("\n===== BARBEARIA =====");
  console.log("1 - Agendar serviço");
  console.log("2 - Ver agendamentos");
  console.log("3 - Sair");
}

async function escolherServico(): Promise<string> {
  console.log("\n--- Serviços disponíveis ---");
  console.log("1 - Corte");
  console.log("2 - Barba");
  console.log("3 - Sobrancelha");

  while (true) {
    const opcao = await rl.question("Escolha o número do serviço: ");
    switch (opcao) {
      case "1": return "Corte";
      case "2": return "Barba";
      case "3": return "Sobrancelha";
      default:
        console.log("Opção inválida! Tente novamente.");
    }
  }
}

function salvarAgendamento(agendamento: Agendamento): void {
  const linha = `Cliente: ${agendamento.nome} | Serviço: ${agendamento.servico} | Horário: ${agendamento.horario}\n`;
  fs.appendFileSync("agendamentos.txt", linha, { encoding: "utf-8" });
  console.log("✅ Agendamento realizado com sucesso!");
}

function verAgendamentos(): void {
  if (!fs.existsSync("agendamentos.txt")) {
    console.log("\nNenhum agendamento encontrado.");
    return;
  }
  const conteudo = fs.readFileSync("agendamentos.txt", { encoding: "utf-8" });
  if (conteudo.trim().length === 0) {
    console.log("\nNenhum agendamento encontrado.");
  } else {
    console.log("\n--- Lista de Agendamentos ---");
    console.log(conteudo);
  }
}

async function main(): Promise<void> {
  while (true) {
    mostrarMenu();
    const opcao = await rl.question("Escolha uma opção: ");

    switch (opcao) {
      case "1":
        const nome = await rl.question("Nome do cliente: ");
        const servico = await escolherServico();
        const horario = await rl.question("Horário (ex: 14:00): ");
        salvarAgendamento({ nome, servico, horario });
        break;

      case "2":
        verAgendamentos();
        break;

      case "3":
        console.log("Saindo do sistema... Até logo!");
        rl.close();
        return;

      default:
        console.log("Opção inválida! Tente novamente.");
    }
  }
}

// Inicia o programa
main();
