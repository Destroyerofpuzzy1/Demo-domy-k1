import s from "./Sections.module.css";

export default function SectionHead({
  no,
  title,
  text,
}: {
  no: string;
  title: React.ReactNode;
  text?: React.ReactNode;
}) {
  return (
    <div className={s.head}>
      <div>
        <div className={s.headNo}>
          <b>{no}</b>
          <i data-line="" aria-hidden="true" />
        </div>
        <h2 className={s.headTitle} data-reveal="">
          {title}
        </h2>
      </div>
      {text && (
        <p className={s.headText} data-reveal="" data-delay="90">
          {text}
        </p>
      )}
    </div>
  );
}
