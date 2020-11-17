import React, {
  ComponentClass,
  FunctionComponent,
  PropsWithChildren,
  useState,
} from 'react';
import Modal from './Modal';

type Element<P = any> = FunctionComponent<P> | ComponentClass<P> | string;

const useModal = (): [boolean, () => void] => {
  const [show, setShow] = useState(false);
  return [show, () => setShow(!show)];
};

interface TygrComponentProps {
  name: string;
  repo: string;
  demo: string;
  component?: Element;
}

export default function TygrComponent(
  props: PropsWithChildren<TygrComponentProps>
) {
  const { name, repo, demo, component: DemoComponent, children } = props;

  const [showModal, toggleModal] = useModal();

  return (
    <div className="tygr-component" onClick={toggleModal}>
      <div className="header">
        <h3>{name}</h3>
        <a href={demo} target="_blank">
          Demo
        </a>
        <a href={repo} target="_blank">
          Repository
        </a>
      </div>
      {children}

      {showModal && DemoComponent && (
        <Modal show={showModal} onDismiss={toggleModal}>
          <DemoComponent />
        </Modal>
      )}
    </div>
  );
}
