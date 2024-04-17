# Documentação do Projeto (TIDocs)

Esta pasta armazena a documentação do projeto para a disciplina de **Trabalho Interdisciplinar 1** dos cursos de Tecnologia da Informação da **[PUC Minas](https://pucminas.br)**. Essa documentação é estruturada na forma de um site que fica disponível por meio do GitHub Pages e pode ser incluído, também, no site da solução hospedada. Um [exemplo publicado do TIDocs](https://webtech-puc-minas.github.io/ti1-template/) está disponível por meio do repositório do **[WebTech PUC Minas](https://github.com/webtech-pucminas)**.

A documentação do projeto inclui as seguintes seções:

1. Introdução
2. Contexto
3. Concepção
4. Metodologia
5. Solução
6. FAQ (Questões frequentes)
7. Referências Bibliográficas

O template para o site é estruturado e permite que a equipe evolua a documentação do projeto à medida que avance no desenvolvimento.

# Orientações gerais

Esta seção traz explicações breves sobre o conjunto de artefatos que precisam ser incluídos na documentação do projeto com uma conjunto de links importantes para que se entenda como criar cada coisa. 

## Problema

Os primeiros socorros desempenham um papel crucial na gestão de uma ampla gama de emergências, e a falta de conhecimento sobre esse tema representa uma preocupação significativa para a segurança e o bem-estar de todos, especialmente para pessoas acima de 13 anos que não possuem conhecimento sobre primeiros socorros e precisam de orientação em situações de emergência. Embora a capacidade de fornecer assistência imediata possa ser decisiva em situações de acidentes ou emergências médicas, é essencial ressaltar que a prestação de primeiros socorros deve ser realizada apenas por pessoas devidamente treinadas.

A ausência de educação formal sobre esse assunto, aliada ao receio de cometer erros e à indisponibilidade de treinamento acessível, evidencia que muitos indivíduos não possuem conhecimentos básicos sobre como agir adequadamente em situações de emergência. Essa lacuna ressalta a necessidade de educar o público e aumentar a conscientização sobre a importância dos princípios básicos de primeiros socorros.


## Objetivos

Objetivo Geral:
Desenvolver um software dedicado à conscientização e educação em primeiros socorros visando mitigar a falta de conhecimento existente no conhecimento básico sobre como agir diante de situações de emergência. Este software será uma ferramenta fundamental para capacitar as pessoas, fornecendo-lhes informações vitais e orientações passo a passo sobre como responder a uma variedade de cenários de emergência. Ao promover uma compreensão mais profunda dos procedimentos de primeiros socorros, o software não apenas aumentará a confiança das pessoas em suas habilidades de resposta, mas também poderá salvar vidas em momentos críticos. Ele proporcionará uma experiência de aprendizado envolvente e prática, adaptada para diversos públicos, desde jovens até adultos. Além disso, a acessibilidade será priorizada, garantindo que o software seja democrático. 

Objetivos Específicos:
- Criar uma plataforma acessível e de fácil utilização que forneça informações sobre primeiros socorros de forma clara e objetiva.
- Desenvolver recursos interativos, como vídeos explicativos e simulações de situações de emergência, para melhorar o aprendizado e retenção do conhecimento.

## Justificativa

A urgência de resolver esta questão reside no fato de que muitas pessoas carecem de conhecimentos fundamentais em primeiros socorros, o que pode desencadear consequências graves durante emergências. O desenvolvimento deste software visa preencher essa lacuna, democratizando o acesso a informações essenciais sobre primeiros socorros. A opção por recursos interativos é motivada pela necessidade de engajar os usuários e facilitar a absorção do conteúdo. A utilização de questionários, entrevistas e análises estatísticas nos permitirá entender de forma mais aprofundada as necessidades e deficiências de conhecimento do público-alvo, orientando assim o desenvolvimento da solução.


## Público-Alvo

O software é direcionado a um público diversificado, compreendendo uma ampla faixa etária, a partir de 13 anos, abrangendo desde leigos até profissionais da área da saúde. Os perfis de usuários incluem:

- Leigos: Pessoas sem conhecimento prévio em primeiros socorros.
- Pais e responsáveis: Indivíduos interessados em aprender a lidar com emergências que envolvam crianças.
- Profissionais da saúde: Médicos, enfermeiros e socorristas que desejam atualizar ou reforçar seus conhecimentos.
- Educadores: Professores e instrutores que buscam recursos para ensinar ou prestar primeiros socorros em escolas e organizações.

Descreva quem serão as pessoas que usarão a sua aplicação indicando os diferentes perfis. O objetivo aqui não é definir quem serão os clientes ou quais serão os papéis dos usuários na aplicação. A ideia é, dentro do possível, conhecer um pouco mais sobre o perfil dos usuários: conhecimentos prévios, relação com a tecnologia, relações hierárquicas, etc.


## Personas

Relacione as personas identificadas no seu projeto e os respectivos mapas de empatia. Lembre-se que você deve ser enumerar e descrever precisamente e de forma personalizada todos os principais envolvidos com a solução almeja.

**Links Úteis**:

- [Persona x Público-alvo](https://flammo.com.br/blog/persona-e-publico-alvo-qual-a-diferenca/)
- [O que é persona?](https://resultadosdigitais.com.br/blog/persona-o-que-e/)
- [Rock Content](https://rockcontent.com/blog/personas/)
- [Criar personas (Hotmart)](https://blog.hotmart.com/pt-br/como-criar-persona-negocio/)

## Histórias de Usuários

Apresente aqui as histórias de usuário que são relevantes para o projeto de sua solução. As Histórias de Usuário consistem em uma ferramenta poderosa para a compreensão e elicitação dos requisitos funcionais e não funcionais da sua aplicação. Se possível, agrupe as histórias de usuário por contexto, para facilitar consultas recorrentes à essa parte do documento.

**Links Úteis**:

- [Histórias de usuários com exemplos e template](https://www.atlassian.com/br/agile/project-management/user-stories)
- [Como escrever boas histórias de usuário (User Stories)](https://medium.com/vertice/como-escrever-boas-users-stories-hist%C3%B3rias-de-usu%C3%A1rios-b29c75043fac)

## Requisitos

Os requisitos de um projeto são classificados em dois grupos:

- [Requisitos Funcionais (RF)](https://pt.wikipedia.org/wiki/Requisito_funcional):
  correspondem a uma funcionalidade que deve estar presente na plataforma (ex: cadastro de usuário).
- [Requisitos Não Funcionais (RNF)](https://pt.wikipedia.org/wiki/Requisito_n%C3%A3o_funcional):
  correspondem a uma característica técnica, seja de usabilidade, desempenho, confiabilidade, segurança ou outro (ex: suporte a dispositivos iOS e Android).

Lembre-se que cada requisito deve corresponder à uma e somente uma característica alvo da sua solução. Além disso, certifique-se de que todos os aspectos capturados nas Histórias de Usuário foram cobertos.

**Links Úteis**:

- [O que são Requisitos Funcionais e Requisitos Não Funcionais?](https://codificar.com.br/requisitos-funcionais-nao-funcionais/)
- [O que são requisitos funcionais e requisitos não funcionais?](https://analisederequisitos.com.br/requisitos-funcionais-e-requisitos-nao-funcionais-o-que-sao/)

## User Flow

Fluxo de usuário (User Flow) é uma técnica que permite ao desenvolvedor mapear todo fluxo de telas do site ou app. Essa técnica funciona para alinhar os caminhos e as possíveis ações que o usuário pode fazer junto com os membros de sua equipe.

**Links Úteis**:

- [User Flow: O Quê É e Como Fazer?](https://medium.com/7bits/fluxo-de-usu%C3%A1rio-user-flow-o-que-%C3%A9-como-fazer-79d965872534)
- [User Flow vs Site Maps](http://designr.com.br/sitemap-e-user-flow-quais-as-diferencas-e-quando-usar-cada-um/)
- [Top 25 User Flow Tools &amp; Templates for Smooth](https://www.mockplus.com/blog/post/user-flow-tools)

## Wireframes

Wireframes são protótipos das telas da aplicação usados em design de interface para sugerir a estrutura de um site web e seu relacionamentos entre suas páginas. Um wireframe web é uma ilustração semelhante ao layout de elementos fundamentais na interface.

**Links Úteis**:

- [Ferramentas de Wireframes](https://rockcontent.com/blog/wireframes/)
- [Figma](https://www.figma.com/)
- [Adobe XD](https://www.adobe.com/br/products/xd.html#scroll)
- [MarvelApp](https://marvelapp.com/developers/documentation/tutorials/)

## Gestão de Projetos

 Nesta parte do documento, você deve apresentar  o processo de trabalho baseado nas metodologias ágeis, a divisão de papéis e tarefas, as ferramentas empregadas e como foi realizada a gestão de configuração do projeto via GitHub.

Coloque detalhes sobre o processo de Design Thinking e a implementação do Framework Scrum seguido pelo grupo. O grupo poderá fazer uso de ferramentas on-line para acompanhar o andamento do projeto, a execução das tarefas e o status de desenvolvimento da solução.

**Links Úteis**:

- [Sobre Projects - GitHub Docs](https://docs.github.com/pt/issues/planning-and-tracking-with-projects/learning-about-projects/about-projects)
- [Gestão de projetos com GitHub | balta.io](https://balta.io/blog/gestao-de-projetos-com-github)
- [(460) GitHub Projects - YouTube](https://www.youtube.com/playlist?list=PLiO7XHcmTsldZR93nkTFmmWbCEVF_8F5H)
- [11 Passos Essenciais para Implantar Scrum no seu Projeto](https://mindmaster.com.br/scrum-11-passos/)
- [Scrum em 9 minutos](https://www.youtube.com/watch?v=XfvQWnRgxG0)
