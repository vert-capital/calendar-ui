export const turnToLastSunday = (date: Date): number => {
  return date.getDate() - date.getDay();
};

export const formatToYYYYMMDD = (date: Date): string => {
  return date.toISOString().split("T")[0];
};

// Função para gerar as semanas do mês atual
export const getWeeksInMonth = (year: number, month: number): Date[][] => {
  const weeks: Date[][] = [];

  // Obter o primeiro dia do mês
  let currentDate = new Date(year, month, 1);

  const firstDayOfWeek = currentDate.getDay(); // 0 para domingo
  if (firstDayOfWeek !== 0) {
    currentDate.setDate(turnToLastSunday(currentDate));
  }

  // Continuar gerando semanas até o mês terminar
  while (currentDate <= new Date(year, month + 1, 0)) {
    const week: Date[] = [];

    // Criar uma semana de domingo a sábado
    for (let i = 0; i < 7; i++) {
      week.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }

    weeks.push(week);
  }

  return weeks;
};
