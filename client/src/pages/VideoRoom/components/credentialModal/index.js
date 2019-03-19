import React, { Component } from 'react';
import Modal from 'components/modal';
import { credentialPrompt } from './styles';

const CredentialModal = ({ showModal, onClose }) => (
  <Modal open={showModal} onClose={onClose}>
    <div className={credentialPrompt}>
      <form>
        <input type="text" />
      </form>
      <section>
        <h1>This is a test</h1>
      </section>
    </div>
  </Modal>
);

export default CredentialModal;
