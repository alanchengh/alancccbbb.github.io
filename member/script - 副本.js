let memberList = [];

// 更新 fetch 路径为相对路径，确保路径正确
fetch('member-data.json')  // 确保 member-data.json 与 index.html 在同一目录下
  .then(response => {
    if (!response.ok) {
      throw new Error('无法加载数据');
    }
    return response.json();
  })
  .then(data => {
    memberList = data;
    console.log('加载会员数据成功:', memberList);  // 调试输出
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

      const avatar = member.avatar ? `<img src="${member.avatar}" alt="头像" class="avatar">` : '';
      const details = `
        <div class="card-content">
          <h3>${member.name}</h3>
          <p><strong>会员编号：</strong>${member.id}</p>
          <p><strong>性别：</strong>${member.gender || '—'}</p>
          <p><strong>手机号：</strong>${member.phone || '—'}</p>
          <p><strong>邮箱：</strong>${member.email || '—'}</p>
          <p><strong>地址：</strong>${member.address || '—'}</p>
          <p><strong>会员等级：</strong>${member.level}</p>
          <p><strong>加入时间：</strong>${member.joinDate}</p>
          <p><strong>备注：</strong>${member.note || '—'}</p>
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
