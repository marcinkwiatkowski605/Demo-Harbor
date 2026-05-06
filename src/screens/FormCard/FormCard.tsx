import { Info } from 'lucide-react';
import { Button } from '../../components/Button';
import { CoverPhoto } from '../../components/CoverPhoto';
import { Input } from '../../components/Input';
import { ProgressBar } from '../../components/ProgressBar';
import { Select } from '../../components/Select';
import { Textarea } from '../../components/Textarea';
import './FormCard.css';

export function FormCard() {
  return (
    <div className="form-card">
      <div className="form-card__content">
        <div className="form-card__header">
          <CoverPhoto />
          <div className="form-card__hero">
            <h2 className="form-card__title text-heading-xxs">
              Practice your interview skills
            </h2>
            <p className="form-card__desc text-body-lg">
              Get ready to meet the interviewers by practicing your skills with Interview Trainer.
            </p>
          </div>
        </div>
        <ProgressBar
          label="Completed interviews:"
          current={1}
          total={3}
          motivationalText="Don't give up, the beginning is always the hardest."
        />
        <div className="form-card__section">
          <h3 className="form-card__section-title text-title-lg">Interview settings</h3>
          <div className="form-card__fields">
            <Input label="Job title" optional placeholder="Add a job title" />
            <Select label="Resume" optional value="Resume_name" />
            <Textarea
              label="Job description"
              optional
              placeholder="Paste a job description"
              helperText="Add the job description to get more relevant and customized questions."
              helperIcon={<Info size={20} strokeWidth={1.5} />}
              showCounter
              maxLength={120}
            />
          </div>
        </div>
        <Button fullWidth>Start interview</Button>
      </div>
    </div>
  );
}
