# ConfitecUserCrud

O teste consiste em criar uma aplicação para adicionar, alterar, listar e excluir usuários. A aplicação deve ter um Frontend para o usuário fazer a interação e uma API que será responsável pelas regras de negócio e persistência dos dados.

TECNOLOGIAS
As tecnologias que devem ser utilizadas são:
 Microsoft .NET Core
 SQL Server
 Angular 8+
 
REQUISITOS
Tabela de banco de dados
 Usuarios:
o Id: INTEIRO
o Nome: TEXTO
o Sobrenome: TEXTO
o Email: TEXTO
o DataNascimento: DATA
o Escolaridade: INTEIRO

Regras de validação
 O e-mail deve ser validado.
 A data de nascimento não pode ser maior que hoje.
 A escolaridade deve permitir apenas os valores (Infantil, Fundamental, Médio e Superior)
 
Backend
 Criar uma API que permita adicionar, alterar, listar e excluir usuário.
 Os dados devem ser persistidos e lidos usando ORM Entity Framework com banco de dados SQL Server.

Frontend
 Criar uma aplicação Angular que permita adicionar, alterar, listar e excluir usuários.
 A arquitetura e layout do frontend fica à escolha, podendo ser uma ou mais telas, disposição de elementos, etc.
 
O QUE SERÁ AVALIADO
 Funcionamento conforme especificado;
 Arquitetura e estruturação do Backend e do Frontend;
 Utilização de padrões de arquitetura DDD ou CQRS;
 Nomenclaturas de arquivos, variáveis e métodos;
 Validação de dados;
 Necessário praticar boas práticas e organização.
