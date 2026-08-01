---
theme: ../theme-modern
download: true
---

# Kubernetesについて

---

# 目次

<Toc maxDepth="1"></Toc>

---

# Kubernetesとは

Kubernetesはコンテナオーケストレーションシステムです。

コンテナオーケストレーションとは、コンテナを自動で管理することです。

Kubernetesは宣言的な構成を使って、コンテナのデプロイ、スケーリング、管理を行います。

---

# Kubernetesの特徴

- サービスの公開と負荷分散
- ストレージオーケストレーション
- リソースの割り当て
- 自動復旧
- シークレットの管理
- バッチ実行
- 水平スケーリング
- IPアドレスの管理

---

# Kubernetesの構成要素

- マスターノード
- ワーカーノード
- kubectl

kubenetesはマスターノードとワーカーノードで構成されます。

マスターノードはクラスタ全体を管理し、ワーカーノードはコンテナを実行します。

kubectlを利用して、クラスタを操作します。

---

# デプロイするには

manifestファイルを作成し、kubectlでクラスタに適用します。

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: jenkins
  labels:
    app: jenkins
spec:
  replicas: 1
  selector:
    matchLabels:
      app: jenkins
  template:
    metadata:
      labels:
        app: jenkins
    spec:
      containers:
        - name: jenkins
          image: jenkins/jenkins:lts
          ports:
            - containerPort: 8080
```

---

# Docker Composeと何が違う？

## Docker Compose

- 複数のコンテナを一括で管理するためのツール
- 一度`docker compose up`で立ち上げたら終わり

## Kubernetes

- コンテナオーケストレーションシステム
- `kubectl apply -f manifest.yaml`でデプロイすることができる。
- デプロイ後も監視を続け、宣言された状態を維持する

コンテナに負荷がかかり、コンテナが落ちたとしてcomposeで起動したコンテナは再起動しないが、Kubernetesは自動で再起動します。

補足: composeでもdocker自体に自動起動の機能はあるため、自動起動は可能。

---

# Kubernetesの構成

Pod, Service, Deploymentなどのリソースを使って、アプリケーションをデプロイします。

- Pod: 1つ以上のコンテナおよび共有のボリュームを含むもの
- Service: ネットワークアプリケーションを公開する方法
- Deployment: PodとReplicaSetを管理するもの
- ReplicaSet: Podのレプリカを管理するもの

上記以外にも様々なリソースがあり、それらを組み合わせてmanifestファイルに記述し、アプリケーションを構築します。

---

# Kustomize

Kustomizeは、Kubernetesのmanifestファイルを生成するためのツールです。

Kustomizeを使うことで、環境ごとに異なる設定を持つmanifestファイルを生成することができます。

例: 本番環境ではレプリカ数を3にするが、開発環境では1にする

---

# Argo CD

Argo CD は、Kubernetes用の宣言型GitOps CDツール。

GitOps は、Git リポジトリを信頼できる唯一の情報源として使用し、インフラストラクチャをコードとして提供するもの。

## 利点

誰が何を変更したかを追跡できる

Gitを唯一の情報源として使用するため、状態が一貫している

コードレビューを通じて変更を承認することができる


---
# 参考文献

- [Kubernetes Overview](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/)
- [Kustomize](https://kustomize.io/)
- [ArgoCD](https://argoproj.github.io/argo-cd/)
- [GitOpsとは](https://www.redhat.com/ja/topics/devops/what-is-gitops)