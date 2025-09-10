  import fs from "fs";
  import readline from "readline";

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  //Sistema para escolher o Serviço de agendar ou ver agendamentos
  function mostrarMenu() {
    console.log("\n===== BARBEARIA =====");
    console.log("1 - Agendar serviço");
    console.log("2 - Ver agendamentos");
    console.log("3 - Sair");
  }

  // Função para escolher serviço com loop confiável
  //Aqui são os serviços oferecidos
  function escolherServico(callback) {
    const menuServicos = () => {
      console.log("\n--- Serviços disponíveis ---");
      console.log("1 - Corte");
      console.log("2 - Barba");
      console.log("3 - Sobrancelha");
// Adicione mais serviços conforme necessário, e escolher os serviços disponíveis
      rl.question("Escolha o número do serviço: ", (opcao) => {
        const escolha = opcao.trim();
        switch (escolha) {
          case "1":
            callback("Corte");
            break;
          case "2":
            callback("Barba");
            break;
          case "3":
            callback("Sobrancelha");
            break;
          default:
            console.log("Opção inválida! Tente novamente.");
            menuServicos(); // mostra o menu novamente
            break;
        }
      });
    };

    menuServicos();
  }

  // Função para salvar agendamento
  // Salvar e deixar os agendamentos em um arquivo txt
  function salvarAgendamento(agendamento) {
    const linha = `Cliente: ${agendamento.nome} | Serviço: ${agendamento.servico} | Horário: ${agendamento.horario}\n`;
    fs.appendFileSync("agendamentos.txt", linha, { encoding: "utf-8" });
    console.log("✅ Agendamento realizado com sucesso!");
  }

  // Função para ver agendamentos
  // ver os agendamentos salvos no arquivo txt  
  function verAgendamentos() {
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

  // Função principal
  function main() {
    mostrarMenu();
    rl.question("Escolha uma opção: ", (opcao) => {
      const escolha = opcao.trim();
      switch (escolha) {
        case "1":
          rl.question("Nome do cliente: ", (nome) => {
            escolherServico((servico) => {
              rl.question("Horário (ex: 14:00): ", (horario) => {
                const agendamento = { nome: nome.trim(), servico, horario: horario.trim() };
                salvarAgendamento(agendamento);
                main(); // volta para o menu
              });
            });
          });
          break;

        case "2":
          verAgendamentos();
          main(); // volta para o menu
          break;

        case "3":
          console.log("Saindo do sistema... Até logo!");
          rl.close();
          break;

        default:
          console.log("Opção inválida! Tente novamente.");
          main();
          break;
      }
    });
  }

  // Inicia o programa
  main();
