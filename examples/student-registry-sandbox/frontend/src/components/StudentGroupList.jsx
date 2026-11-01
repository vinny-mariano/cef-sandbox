import { useCallback, useEffect, useState } from "react";
import { studentApi } from "../api/studentApi.js";

function formatDate(value) {
  if (!value) return "Data indisponível";
  return new Intl.DateTimeFormat("pt-BR", { dateStyle: "medium" }).format(new Date(value));
}

export default function StudentGroupList({ onStudentsChange, refreshToken }) {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadStudents = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const result = await studentApi.list();
      setStudents(result.data);
      onStudentsChange(result.data);
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setLoading(false);
    }
  }, [onStudentsChange]);

  useEffect(() => {
    loadStudents();
  }, [loadStudents, refreshToken]);

  const studentsByCourse = students.reduce((groups, student) => {
    const courseStudents = groups.get(student.course) ?? [];
    courseStudents.push(student);
    groups.set(student.course, courseStudents);
    return groups;
  }, new Map());

  return (
    <section className="panel list-panel">
      <div className="section-heading">
        <div>
          <p className="eyebrow">REGISTROS</p>
          <h3>Estudantes por curso</h3>
        </div>
        <button className="button button-quiet" type="button" onClick={loadStudents} disabled={loading}>
          Atualizar
        </button>
      </div>

      {error ? (
        <div className="alert" role="alert">{error}</div>
      ) : loading ? (
        <p className="empty-state">Carregando estudantes...</p>
      ) : students.length === 0 ? (
        <p className="empty-state">Nenhum estudante cadastrado.</p>
      ) : (
        <div className="student-list">
          {[...studentsByCourse].map(([course, courseStudents]) => (
            <section key={course}>
              <h4>{course}</h4>
              {courseStudents.map((student) => (
                <article className="student-row" key={student.id}>
                  <div className="avatar" aria-hidden="true">{student.name.slice(0, 1).toUpperCase()}</div>
                  <div className="student-info">
                    <strong>{student.name}</strong>
                    <span>{student.email}</span>
                  </div>
                  <div className="student-meta">
                    <span className={`status status-${student.status}`}>
                      {student.status === "active" ? "Ativo" : "Inativo"}
                    </span>
                    <small>Criado em {formatDate(student.createdAt)}</small>
                  </div>
                </article>
              ))}
            </section>
          ))}
        </div>
      )}
    </section>
  );
}
