export default function SettingsPage() {
  return (
    <div className="p-6">
      <h1 className="mb-6 text-2xl font-bold">Configurações</h1>
      <div className="space-y-6">
        <div className="rounded-lg bg-white p-6 shadow">
          <h2 className="mb-4 text-lg font-semibold">Perfil</h2>
          <p className="text-gray-600">
            Configurações do seu perfil virão aqui.
          </p>
        </div>
        <div className="rounded-lg bg-white p-6 shadow">
          <h2 className="mb-4 text-lg font-semibold">Notificações</h2>
          <p className="text-gray-600">
            Configurações de notificações virão aqui.
          </p>
        </div>
        <div className="rounded-lg bg-white p-6 shadow">
          <h2 className="mb-4 text-lg font-semibold">Privacidade</h2>
          <p className="text-gray-600">
            Configurações de privacidade virão aqui.
          </p>
        </div>
      </div>
    </div>
  );
}
