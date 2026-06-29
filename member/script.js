let memberList = [];

// 加载会员数据
fetch('member-data.json')  
  .then(response => {
    if (!response.ok) {
      throw new Error('无法加载数据');
    }
    return response.json();
  })
  .then(data => {
    memberList = data;
    console.log('加载会员数据成功:', memberList);
  })
  .catch(error => {
    console.error('加载会员数据失败', error);
  });

function searchMember() {
  console.log('查询按钮被点击');  // 调试输出，检查按钮点击是否触发

  const input = document.getElementById('searchInput').value.trim();
  const resultDiv = document.getElementById('result');

  if (input === "") {
    alert("请输入查询内容！");
    return;
  }

  // 清空之前的结果
  resultDiv.innerHTML = '';

  const filteredMembers = memberList.filter(m => m.id === input || m.name === input);

  if (filteredMembers.length > 0) {
    filteredMembers.forEach(member => {
      const card = document.createElement('div');
      card.classList.add('card');

      const avatar = member.avatar ? `<img src="${member.avatar}" alt="头像">` : '';
      const details = `
        <div class="card-content">
          <h3>${member.name}</h3>
          <table>
            <tr>
              <td class="label">会员编号：</td>
              <td class="value">${member.id}</td>
            </tr>
            <tr>
              <td class="label">性别：</td>
              <td class="value">${member.gender || '—'}</td>
            </tr>
            <tr>
              <td class="label">手机号：</td>
              <td class="value">${member.phone || '—'}</td>
            </tr>
            <tr>
              <td class="label">邮箱：</td>
              <td class="value">${member.email || '—'}</td>
            </tr>
            <tr>
              <td class="label">会员等级：</td>
              <td class="value">${member.level}</td>
            </tr>
            <tr>
              <td class="label">加入时间：</td>
              <td class="value">${member.joinDate}</td>
            </tr>
            <tr>
              <td class="label">地址：</td>
              <td class="value">${member.address || '—'}</td>
            </tr>
            <tr>
              <td class="label">备注：</td>
              <td class="value">${member.note || '—'}</td>
            </tr>
          </table>
        </div>
      `;

      card.innerHTML = avatar + details;
      resultDiv.appendChild(card);
    });
  } else {
    const noResultMessage = document.createElement('div');
    noResultMessage.classList.add('card');
    noResultMessage.innerHTML = `
      <div class="card-content">
        <h3>未找到会员</h3>
        <p>请检查输入是否正确。</p>
      </div>
    `;
    resultDiv.appendChild(noResultMessage);
  }
}
