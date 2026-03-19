export default function PrivacyPage() {
  return (
    <main className="min-h-screen" style={{ background: 'var(--bg-deep)', color: 'var(--text-primary)' }}>
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <h1 className="text-3xl sm:text-5xl font-bold mb-3">Privacy Policy</h1>
        <p className="text-sm mb-8" style={{ color: 'var(--text-muted)' }}>Last updated: March 2026</p>

        <div className="space-y-6 text-sm sm:text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          <section>
            <h2 className="text-xl font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>🔒 Your data stays yours</h2>
            <p>
              No analizamos ni entrenamos sobre el contenido de tus bundles. Tus archivos se almacenan y recuperan tal cual.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>🔑 About API keys & sensitive data</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>El acceso requiere autenticación válida.</li>
              <li>No inspeccionamos ni indexamos el contenido de backups.</li>
              <li>El tráfico se protege por HTTPS/TLS.</li>
              <li>Recomendamos no guardar secretos en texto plano.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>☁️ Data storage</h2>
            <p>
              Los respaldos se almacenan en infraestructura cloud segura. Puedes eliminarlos en cualquier momento.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>📊 What we collect</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>Correo de cuenta para autenticación.</li>
              <li>Métricas básicas de uso para límites operativos.</li>
              <li>Claves/API solo para validación segura cuando aplica.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>✉️ Contact</h2>
            <p>
              Si tienes dudas de privacidad, contáctanos en: <a href="mailto:privacy@findbot.ai" style={{ color: 'var(--cyan-bright)' }}>privacy@findbot.ai</a>
            </p>
          </section>
        </div>
      </section>
    </main>
  )
}
