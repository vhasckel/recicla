// normaliza um texto removendo acentos e convertendo para minúsculas
export function normalizeText(text: string): string {
    return text
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');
} 