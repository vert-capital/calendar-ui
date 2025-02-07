# Documentação dos Componentes do Calendário de Eventos

## CalendarEventsWeek
- **Descrição**: Componente que exibe eventos em uma visualização semanal, permitindo a seleção de datas e filtragem de eventos.
- **Propriedades**:
  - `searchParams` (string): Parâmetros de pesquisa para filtrar eventos.
  - `res` (any): Dados de eventos a serem exibidos.
  - `startDate` (string, opcional): Data de início para o seletor de datas.
  - `access` (object): Objeto contendo informações de acesso.
    - `ops` (string): Operações permitidas.
    - `obligation` (string): Obrigações associadas.
    - `calendar_event` (string): Identificador do evento do calendário.
    - `token` (string): Token de autenticação.
  - `ambiente` (string, opcional): Ambiente de execução (dev, prod, homolog, qa).

- **Exemplo de Uso**:
```jsx
<CalendarEventsWeek
  searchParams="example"
  res={eventData}
  startDate="2025-02-01"
  access={{
    ops: "read",
    obligation: "none",
    calendar_event: "event123",
    token: "your-token",
  }}
/>
```

## CardEventMiniCalendar
- **Descrição**: Componente que exibe um cartão para um evento em um calendário miniatura, permitindo a visualização rápida de informações do evento.
- **Propriedades**:
  - `data` (EventMiniCalendar): Objeto contendo os dados do evento.

- **Exemplo de Uso**:
```jsx
<CardEventMiniCalendar
  data={{
    id: "event123",
    color: "#ff0000",
    event_title: "Reunião de Projeto",
    responsible_obligation: "João Silva",
    patrimony_formatted: "Patrimônio 001",
    status: "Pendente",
  }}
/>
```

## CardEvent
- **Descrição**: Componente que exibe um cartão de evento, com um estado de carregamento e a capacidade de abrir um modal ao clicar.
- **Propriedades**:
  - `title` (string, opcional): Título do evento.
  - `subtitle` (string, opcional): Subtítulo do evento.
  - `color` (string, opcional): Cor associada ao evento.
  - `openModal` (function, opcional): Função a ser chamada ao clicar no cartão.

- **Exemplo de Uso**:
```jsx
<CardEvent
  title="Reunião de Projeto"
  subtitle="Discussão sobre o andamento"
  color="#00ff00"
  openModal={(event) => console.log(event)}
/>
```

## DatePickerWeek
- **Descrição**: Componente que permite a seleção de uma semana, com botões para navegar entre semanas e definir a data atual.
- **Propriedades**:
  - `valueSelect` (function): Função a ser chamada ao selecionar uma nova semana.
  - `startDate` (string, opcional): Data de início para a seleção da semana.

- **Exemplo de Uso**:
```jsx
<DatePickerWeek
  valueSelect={(dates) => console.log(dates)}
  startDate="2025-02-01"
/>
```

## EventDetails
- **Descrição**: Componente que exibe os detalhes de um evento em um modal, permitindo visualizar informações detalhadas e responsáveis.
- **Propriedades**:
  - `data` (any): Dados do evento a serem exibidos.
  - `isOpen` (boolean): Indica se o modal está aberto.
  - `setIsOpen` (function): Função para controlar a abertura e fechamento do modal.
  - `urls` (object): URLs relacionadas ao evento.

- **Exemplo de Uso**:
```jsx
<EventDetails
  data={eventData}
  isOpen={isModalOpen}
  setIsOpen={setModalOpen}
  urls={{
    ops: "https://example.com/ops",
    obligation: "https://example.com/obligation",
    calendar_event: "https://example.com/event",
  }}
/>
```

## FilterEvents
- **Descrição**: Componente que permite filtrar eventos com base em checkboxes, exibindo informações adicionais sobre cada evento.
- **Propriedades**:
  - `eventList` (IEvent[]): Lista de eventos a serem exibidos como checkboxes.
  - `searchParams` (string): Parâmetros de pesquisa para filtrar eventos.
  - `valueSelect` (function): Função a ser chamada ao alterar a seleção de eventos.

- **Exemplo de Uso**:
```jsx
<FilterEvents
  eventList={[
    { id: 1, name: "Evento 1", name_display: "Evento 1", info: "Informação 1", color: "#ff0000" },
    { id: 2, name: "Evento 2", name_display: "Evento 2", info: "Informação 2", color: "#00ff00" },
  ]}
  searchParams="1,2"
  valueSelect={(selected) => console.log(selected)}
/>
```

## Card
- **Descrição**: Componente que serve como um contêiner estilizado para outros elementos, com suporte a classes personalizadas.
- **Propriedades**:
  - `children` (React.ReactNode): Elementos filhos a serem renderizados dentro do cartão.
  - `className` (string, opcional): Classe CSS adicional para personalização do estilo.

- **Exemplo de Uso**:
```jsx
<Card className="my-custom-class">
  <h2>Título do Cartão</h2>
  <p>Conteúdo do cartão.</p>
</Card>
```

## DatePicker
- **Descrição**: Componente que permite a seleção de uma semana em um calendário, com navegação entre meses e exibição da semana selecionada.
- **Propriedades**:
  - `week` (Date, opcional): Data da semana a ser exibida (padrão é a data atual).
  - `valueSelect` (function): Função a ser chamada ao selecionar uma nova semana.
  - `selectedWeek` (Date[] | null): Semana atualmente selecionada.
  - `setSelectedWeek` (function): Função para atualizar a semana selecionada.

- **Exemplo de Uso**:
```jsx
<DatePicker
  week={new Date()}
  valueSelect={(dates) => console.log(dates)}
  selectedWeek={null}
  setSelectedWeek={(week) => console.log(week)}
/>