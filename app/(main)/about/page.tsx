export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-4xl px-4">
        <h1 className="mb-8 text-4xl font-bold text-gray-900">
          Sobre o Recicla
        </h1>

        <div className="space-y-6 rounded-lg bg-white p-8 shadow-lg">
          <section>
            <h2 className="mb-4 text-2xl font-semibold text-gray-800">
              Nossa Missão
            </h2>
            <p className="leading-relaxed text-gray-600">
              O Recicla é uma plataforma inovadora que conecta pessoas e
              empresas aos pontos de coleta de recicláveis mais próximos. Nossa
              missão é facilitar o processo de reciclagem e contribuir para um
              futuro mais sustentável.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-gray-800">
              Como Funciona
            </h2>
            <p className="leading-relaxed text-gray-600">
              Utilizamos tecnologia avançada para mapear e catalogar pontos de
              coleta em todo o país. Nossa plataforma permite que você encontre
              facilmente onde descartar seus materiais recicláveis de forma
              responsável e eficiente.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-gray-800">
              Impacto Ambiental
            </h2>
            <p className="leading-relaxed text-gray-600">
              A cada tonelada de material reciclado, contribuímos para a redução
              da poluição e preservação dos recursos naturais. Junte-se a nós
              nesta jornada rumo a um planeta mais limpo e sustentável.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
