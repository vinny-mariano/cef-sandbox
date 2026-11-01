import { useEffect, useState } from "react";
import { studentApi } from "./api/studentApi.js";

function formatDate(value) {
  if (!value) return "Data indisponível";
  return new Intl.DateTimeFormat("pt-BR", { dateStyle: "medium" }).format(new Date(value));
}

export default function App() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ name: "", email: "", course: "" });
  const [saving, setSaving] = useState(false);

  async function loadStudents() {
    setLoading(true);
    setError("");
    try {
      const result = await studentApi.list();
      setStudents(result.data);
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadStudents();
  }, []);

  function updateField(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setSaving(true);
    setError("");
    try {
      const result = await studentApi.create(form);
      setStudents((current) => [...current, result.data]);
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
        <section className="panel list-panel">
          <div className="section-heading">
            <div>
              <p className="eyebrow">REGISTROS</p>
              <h3>Estudantes cadastrados</h3>
            </div>
            <button className="button button-quiet" type="button" onClick={loadStudents} disabled={loading}>
              Atualizar
            </button>
          </div>

          {loading ? (
            <p className="empty-state">Carregando estudantes...</p>
          ) : students.length === 0 ? (
            <p className="empty-state">Nenhum estudante cadastrado.</p>
          ) : (
            <div className="student-list">
              {students.map((student) => (
                <article className="student-row" key={student.id}>
                  <div className="avatar" aria-hidden="true">{student.name.slice(0, 1).toUpperCase()}</div>
                  <div className="student-info">
                    <strong>{student.name}</strong>
                    <span>{student.email}</span>
                    <small>{student.course}</small>
                  </div>
                  <div className="student-meta">
                    <span className={`status status-${student.status}`}>{student.status === "active" ? "Ativo" : "Inativo"}</span>
                    <small>Criado em {formatDate(student.createdAt)}</small>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

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
