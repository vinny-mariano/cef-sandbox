import { useCallback, useState } from "react";
import { studentApi } from "./api/studentApi.js";
import StudentGroupList from "./components/StudentGroupList.jsx";

export default function App() {
  const [students, setStudents] = useState([]);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({ name: "", email: "", course: "" });
  const [saving, setSaving] = useState(false);
  const [refreshToken, setRefreshToken] = useState(0);

  const handleStudentsChange = useCallback((updatedStudents) => {
    setStudents(updatedStudents);
    setError(null);
  }, []);

  function updateField(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const result = await studentApi.create(form);
      setStudents((current) => [...current, result.data]);
      setRefreshToken((current) => current + 1);
      setForm({ name: "", email: "", course: "" });
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setSaving(false);
    }
  }

  const activeCount = students.filter((student) => student.status === "active").length;

  return (
    <main className="page-shell">
      <header className="topbar">
        <div className="brand-mark" aria-hidden="true">SR</div>
        <div>
          <p className="eyebrow">AMBIENTE DE TREINAMENTO</p>
          <h1>Student Registry</h1>
        </div>
        <span className="sandbox-tag">Sandbox fictício</span>
      </header>

      <section className="intro">
        <div>
          <p className="eyebrow">PAINEL ACADÊMICO</p>
          <h2>Cadastro de estudantes</h2>
          <p className="intro-copy">Uma aplicação demonstrativa para exercitar desenvolvimento, persistência e qualidade de código.</p>
        </div>
        <div className="summary-card">
          <span className="summary-label">Estudantes ativos</span>
          <strong>{activeCount}</strong>
          <span className="summary-foot">de {students.length} registros</span>
        </div>
      </section>

      {error && <div className="alert" role="alert">{error}</div>}

      <section className="content-grid">
        <StudentGroupList
          onStudentsChange={handleStudentsChange}
          refreshToken={refreshToken}
        />

        <aside className="panel form-panel">
          <p className="eyebrow">NOVO REGISTRO</p>
          <h3>Adicionar estudante</h3>
          <p className="form-copy">Os dados são fictícios e ficam armazenados localmente no sandbox.</p>
          <form onSubmit={handleSubmit}>
            <label htmlFor="name">Nome</label>
            <input id="name" name="name" value={form.name} onChange={updateField} placeholder="Nome fictício" required />

            <label htmlFor="email">E-mail</label>
            <input id="email" name="email" type="email" value={form.email} onChange={updateField} placeholder="nome@example.invalid" required />

            <label htmlFor="course">Curso</label>
            <input id="course" name="course" value={form.course} onChange={updateField} placeholder="Nome do curso" required />

            <button className="button button-primary" type="submit" disabled={saving}>
              {saving ? "Salvando..." : "Cadastrar estudante"}
            </button>
          </form>
        </aside>
      </section>

      <footer className="footer-note">CEF Sandbox · Dados de demonstração · Nenhuma informação real</footer>
    </main>
  );
}
