<template>
  <div class="list-info-container">
    <h3>Document Center</h3>
    <table>
      <thead>
        <tr>
          <th>Document</th>
          <th colspan="2">Type</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Terms & Conditions</td>
          <td>Web link</td>
          <td>
            <a href="https://mednefits.com/tcmember" target="_blank" class="edit-button-in-table">View</a>
          </td>
        </tr>
        <tr>
          <td>Privacy Policy</td>
          <td>Web link</td>
          <td>
            <a href="https://mednefits.com/privacy" target="_blank" class="edit-button-in-table">View</a>
          </td>
        </tr>
        <tr>
          <td>Product Brochure</td>
          <td>PDF</td>
          <td>
            <a href="https://drive.google.com/open?id=1SlFvw7Lu5-86-BsGUQP3BkPnpdPgx5Nk" target="_blank" class="edit-button-in-table">Download</a>
          </td>
        </tr>
        <tr>
          <td>How Mednefits Work</td>
          <td>PDF</td>
          <td>
            <a href="https://drive.google.com/file/d/0B5jNkJc1lOQDZjhpWmxwcDhMbWc/view" target="_blank" class="edit-button-in-table">Download</a>
          </td>
        </tr>
        <tr>
          <td>Mednefits Care Certificate</td>
          <td>PDF</td>
          <td>
            <a :href="documentData" target="_blank" class="edit-button-in-table">Download</a>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- modals here -->
  </div>
</template>

<script>
import DocumentCenter from "@/components/company/account/document-center";

export default DocumentCenter;
</script>

